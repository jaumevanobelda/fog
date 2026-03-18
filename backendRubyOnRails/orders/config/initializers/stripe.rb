# config/initializers/stripe.rb
require "stripe"

Stripe.api_key = ENV.fetch("STRIPE_SECRET_KEY")
Stripe.enable_telemetry = false

# Fix de encoding en Windows para evitar invalid byte sequence
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8