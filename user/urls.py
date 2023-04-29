from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import login_view, register_view
from log import views


app_name = 'user'

urlpatterns = [
	path('login/', login_view, name='login'),
	path('logout/', LogoutView.as_view(template_name='logout.html'), name='logout'),
	path('register/', register_view, name='register'),
	path('profile/', login_view),
]
