import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from django.core.asgi import get_asgi_application
from studio.consumers import Consumer
from channels.security.websocket import AllowedHostsOriginValidator
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "studio.settings")

application = ProtocolTypeRouter({
    # Django's ASGI application to handle traditional HTTP requests
    "http": get_asgi_application(),

    "websocket": AllowedHostsOriginValidator(AuthMiddlewareStack(
        URLRouter([
            path('reload/', Consumer.as_asgi()),
        ])
    ))

})
