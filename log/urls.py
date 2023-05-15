from django.urls import path, include
from . import views
from .views import Dashboard, RideEdit, RideList, RampChart



app_name = 'log'

urlpatterns = [
	path('', Dashboard.as_view(), name='log'),
	path('list/', RideList.as_view(), name='ride-list'),
	path('<pk>', RideEdit.as_view(), name="ride-edit"),
	path('chart/', RampChart.as_view(), name="chart"),
]

