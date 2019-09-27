"""team_directory URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url

from slack_auth.views import AuthenticationView
from members.views import MembersView, MemberDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Slack OAuth
    url(r'^slack/', include('django_slack_oauth.urls')),
    url(r'^slack/success', AuthenticationView.as_view()),
    # Members
    url(r'^api/members/$', MembersView.as_view()),
    url(r'^api/members/(?P<pk>[-\d]+)/$', MemberDetailView.as_view())
]
