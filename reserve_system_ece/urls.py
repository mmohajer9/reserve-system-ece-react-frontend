"""reserve_system_ece URL Configuration

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
from django.urls import path , include
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('/api/reserve-system/' , include('reserve_app.urls' , namespace='reserve-system-api')),
    path('signin/oauth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('docs/' , include_docs_urls(title= 'Reserve System Documentation')),
]




'''
send a packet with post to "localhost:8000/signin/oauth/token" for LOGIN:


request:
            {
                "grant_type" : "password",
                "client_id" : "IzAwTAgizQfD59DJwF8JNfNNpi6axwENo5Eltk3z", # from oauth/applications
                "username" : "my_username",
                "password" : "my_password"
            }

response:
            {
                "access_token": "WDZkCMO7Ah5Y96va0Pog9OkTFWET7O",
                "expires_in": 36000,
                "token_type": "Bearer",
                "scope": "read write groups",
                "refresh_token": "LWuJaxNJVxKcHz7qJneXrNS9Fm0RoL"
            }

getting a new token:

            {
                "grant_type" : "refresh_token",
                "client_id" : "IzAwTAgizQfD59DJwF8JNfNNpi6axwENo5Eltk3z",  # from oauth/applications
                "refresh_token": "LWuJaxNJVxKcHz7qJneXrNS9Fm0RoL"
            }

LOGIN URL: localhost:8000/signin/oauth/token

'''