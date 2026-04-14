class UserMailer < ApplicationMailer
  def confirm_email(user,confirm_token)
    @user = user
    @url = "http://localhost:5173/confirm/#{confirm_token}"

    mail(
			# to: @user.email,
      to: ENV.fetch('SMTP_EMAIL'),
      subject: 'Confirmacion registro'
    )
  end
end