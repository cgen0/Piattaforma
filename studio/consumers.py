import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from console.models import Pratica


class Consumer(WebsocketConsumer):

    def connect(self):
        user = self.scope["user"]
        if user.is_anonymous:
            self.close()
        async_to_sync(self.channel_layer.group_add)(
            str(user),
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        objs = Pratica.objects.filter(read=self.scope["user"])
        # Join room group

        async_to_sync(self.channel_layer.group_discard)(
            str(self.scope["user"]),
            self.channel_name
        )

    def pratica_update(self, event):
        self.send(text_data=json.dumps({
            'pratica': event['pratica'],
            'nome': event['nome'],
            'indirizzo': event['indirizzo'],
            'type': "update",
        }))

    def pratica_del(self, event):
        self.send(text_data=json.dumps({
            'pratica': event['pratica'],
            'type': "del",

        }))

    def pratica_add(self, event):
        self.send(text_data=json.dumps({
            'pratica': event['pratica'],
            'nome': event['nome'],
            'indirizzo': event['indirizzo'],
            'pianta': "",
            'type': "add",

        }))
