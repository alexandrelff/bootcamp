from allauth.account.forms import SignupForm
from captcha.fields import ReCaptchaField

class UserSpamForm(SignupForm):
    reCAPTCHA = ReCaptchaField()
    field_order = [
        "username",
        "email",
        "password1",
        "password2",  
        "reCAPTCHA"
    ]