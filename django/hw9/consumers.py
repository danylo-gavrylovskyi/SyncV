from channels.consumer import AsyncConsumer
import json 

class YourConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        await self.send({"type": "websocket.accept"})

    async def websocket_receive(self, text_data):
        print(text_data)
        message = text_data['text']
        messageJSON = json.loads(message)
        print(messageJSON)
        await self.send_group({"myMsg": "Hello from Django socket", "yourMsg": message})

    async def websocket_disconnect(self, event):
        pass

    async def send_group(self, message):
        print('send_group')
        print(message)
        await self.channel_layer.group_add('chat', self.channel_name)
        await self.channel_layer.group_send(
            'chat',
            {
                'type': 'chat.message',
                'text': message,
            }
        )
    
    async def chat_message(self, event):
        message = event['text']
        await self.send({
            "type": "websocket.send",
            "text": json.dumps({"myMsg": "Hello from Django socket", "yourMsg": message['yourMsg']})
        })