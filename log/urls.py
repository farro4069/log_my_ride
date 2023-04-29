from django.urls import path, include
from . import views
from .views import Dashboard, RideEdit, RideList



app_name = 'log'

urlpatterns = [
	path('', Dashboard.as_view(), name='log'),
	path('list/', RideList.as_view(), name='ride-list'),
	path('<pk>', RideEdit.as_view(), name="ride-edit"),
]

