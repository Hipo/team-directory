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
from django.urls import path
from django.conf.urls import url

from team_directory.users.views import UsersView, UserDetailView, MyUserDetailView, AuthenticationView
from team_directory.projects.views import ProjectsView, ProjectDetailView
from team_directory.questions.views import QuestionsView, QuestionDetailView, AnswersView, AnswerDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Slack OAuth
    # Users
    url(r'^api/users/authentication/', AuthenticationView.as_view()),
    # url(r'^slack/success/', AuthenticationView.as_view()),
    url(r'^api/users/$', UsersView.as_view()),
    url(r'^api/users/(?P<pk>[-\d]+)/$', UserDetailView.as_view()),
    url(r'^api/users/me/$', MyUserDetailView.as_view()),
    # Projects
    url(r'^api/projects/$', ProjectsView.as_view()),
    url(r'^api/projects/(?P<pk>[-\d]+)/$', ProjectDetailView.as_view()),
    # Questions
    url(r'^api/questions/$', QuestionsView.as_view()),
    url(r'^api/questions/(?P<pk>[-\d]+)/$', QuestionDetailView.as_view()),
    url(r'^api/answers/$', AnswersView.as_view()),
    url(r'^api/answers/(?P<pk>[-\d]+)/$', AnswerDetailView.as_view()),
]