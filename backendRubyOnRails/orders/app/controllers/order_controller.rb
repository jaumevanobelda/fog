class OrderController < ApplicationController
    # require "stripe"
    # Stripe.api_key = ENV.fetch("STRIPE_SECRET_KEY")
    # Stripe.enable_telemetry = false



    def create_checkout_order
        # games = Game.where(slug: params[:games]).pluck(:id)
        games = Game.where(slug: params[:games])
        gameInactive = games.find_by(isActive: false)
        return render json: { error: "El juego #{gameInactive.nom} ya no existe" }, status: 400 if gameInactive != nil

        user = User.find(request.headers["User-Id"]&.to_i)
        repeated_game = user.libraries.find_by(game_id: games)
        pp "repeated_game"
        pp repeated_game
        return render json: { error: "El juego #{Game.find(repeated_game.game_id).nom} ya esta en tu biblioteca" }, status: 400 if repeated_game != nil

        
        
        repeated_orders = Order.where(user_id: request.headers["User-Id"]&.to_i, status: "PENDING")

        if repeated_orders != nil
            repeated_orders.map do |repeated_order|
                stripeSession = Stripe::Checkout::Session.retrieve(repeated_order.stripe_session_id)
                if stripeSession.payment_status == "paid"
                    return render json: { sessionId: stripeSession.id, url: "#{ENV.fetch("FRONTEND_URL")}/checkout/success?session_id=#{stripeSession.id}" }
                end

                pp stripeSession 

                # return render json: {  sessionId: stripeSession.id, url: "#{ENV.fetch("FRONTEND_URL")}/checkout/cancel?session_id=#{stripeSession.id}" }, status: 400 if stripeSession.url == nil

                return render json: { sessionId: stripeSession.id, url: stripeSession.url } if stripeSession.url != nil
                repeated_order.update(status: "CANCELLED")
            end
        end
        line_items = games.map do |game|
            # game = Game.find(game_id)
            pp "game"
            pp game
            {
                price_data: {
                    currency: "eur",
                    unit_amount: game.precio * 100,
                    product_data: { name: game.nom, images: game.game_images.pluck(:image) }
                },
                quantity: 1
            }
        end
        session = Stripe::Checkout::Session.create(
            payment_method_types: ["card"],
            mode: "payment",
            line_items: line_items,
            success_url: "#{ENV.fetch("FRONTEND_URL")}/checkout/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "#{ENV.fetch("FRONTEND_URL")}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}",
            # metadata: {
            #     user_id: request.headers["User-Id"]&.to_s,
            #     games:  games.pluck(:id).to_json
            # }
        )
        pp "session" 
        pp session 

        order = Order.create(
            user_id:request.headers["User-Id"]&.to_i,
            status: "PENDING",
            stripe_session_id: session.id,
            total_price: session.amount_total,
            # game_ids:games
            # order_games:games.as_json
        )

        games.each do |game|
            order.order_games.create!(
                game.as_order_game
            )
        end
        pp "order" 
        pp order 

        render json: { sessionId: session.id, url: session.url }
    end

    def confirm_order
        stripeSesion = Stripe::Checkout::Session.retrieve(params[:sessionId])
        pp stripeSesion
        
        
        order = Order.find_by(user_id: request.headers["User-Id"]&.to_i, stripe_session_id: stripeSesion.id)

        pp order

        return render json: { error: "Orden no encontrada" }, status: 404 if order === nil
        return render json: { error: "Orden ya processada" }, status: 400 if order.status == "SUCCEDED"
        if stripeSesion.payment_status != "paid"
            order.update(status: "FAILED")
            return render json: { error: "Pago no completado" }, status: 400 
        end

        user = User.find(request.headers["User-Id"]&.to_i)
        library = user.libraries.pluck(:game_id)
        order.order_games.each do |game|
            user.libraries.create(game_id:game.game_id)
        end
         
        order.update(status: "SUCCEDED")

        
        


        render json: {},status:200

    rescue StandardError => error
        order.update(status: "FAILED")
        render json: { error: error.message }, status: 500
    end

    def cancel_order

        stripeSesion = Stripe::Checkout::Session.retrieve(params[:sessionId])
        pp stripeSesion
        
        
        order = Order.find_by(user_id: request.headers["User-Id"]&.to_i, stripe_session_id: stripeSesion.id)
        pp "order"
        pp order

        return render json: { error: "No se puede cancelar una orden pagada" }, status: 400  if stripeSesion.payment_status == "paid"

        order.update(status: "CANCELLED")

        render json: {},status:200

    end
end
