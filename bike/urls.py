from django.urls import path, include
from bike.views import BikesView, AddBike, EditBike, AddWheelset, EditWheelset
from bike import views


app_name = 'bike'

urlpatterns = [
	path('', BikesView.as_view(), name='bike'),
	path('add/', AddBike.as_view(), name='add_bike'),
	path('edit/<pk>', EditBike.as_view(), name='edit_bike'),
	path('wheels/', AddWheelset.as_view(), name='wheels'),
	path('wheels/<pk>', EditWheelset.as_view(), name='edit_wheels'),

]
