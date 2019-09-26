from django.http import HttpResponseRedirect
from rest_framework.views import APIView


class AuthenticationView(APIView):
    def get(self, request, format=None):
        return HttpResponseRedirect("/?token=" + request.session["token"])
