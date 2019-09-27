from django.shortcuts import redirect
from rest_framework.views import APIView


class AuthenticationView(APIView):
    def get(self, request, format=None):
        return redirect("http://localhost:3000/?token=" + request.session["token"])
