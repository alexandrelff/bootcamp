from django.core.mail import EmailMessage, send_mail

from bootcamp.users.models import User

def notify_added_news(news):
    for user in User.objects.filter(send_notification=True):
        email = EmailMessage(
            "Title",
            "Test body",
            "encontrosdigitais@example.com",
            [user.email]
        )
        email.send()
    pass