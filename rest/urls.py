from django.urls import path, include
from rest.views import ApiData


app_name = 'rest'

urlpatterns = [
	path('', ApiData.as_view(), name='rest'),

	]
