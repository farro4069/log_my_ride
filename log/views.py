from django.views.generic import TemplateView
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model
from bike.models import BikeDetail, Wheelsets
from log.models import RideDetail
from log.forms import RideLogForm, RideEditForm

User = get_user_model()


class Dashboard(TemplateView):
	def get(self, request):
		template_name = 'index.html'
		page_title = 'dashboard'
		form = RideLogForm(request.POST or None, user=request.user)

		context = {
			"page_title": page_title,
			"form": form,
		}

		if request.user.is_authenticated:
			return render(request, template_name, context)

		else:
			return redirect('user:login')

	def post(self, request):
		form = RideLogForm(request.POST)
		user = request.user
		if form.is_valid():
			RideDetail = form.save(commit=False)
			RideDetail.user = request.user
			RideDetail.ride_date = form.cleaned_data['ride_date']
			RideDetail.ride_name = form.cleaned_data['ride_name']
			RideDetail.ride_distance = form.cleaned_data['ride_distance']
			RideDetail.ride_time = form.cleaned_data['ride_time']
			RideDetail.ride_tss = form.cleaned_data['ride_tss']
			RideDetail.ride_comment = form.cleaned_data['ride_comment']
			RideDetail.bike_name = form.cleaned_data['bike_name']
			RideDetail.wheelset = form.cleaned_data['wheelset']
			RideDetail.save()
			return redirect('log:log')
		else:
			form = RideLogForm()
			context = {'form':form}
			return render(request, 'add_ride.html', context)

class RideEdit(TemplateView):
	def get(self, request, pk=None):
		template_name = "ride.html"
		ride = get_object_or_404(RideDetail, id=pk)
		form = RideEditForm(request.POST or None, instance = ride)

		context = {
			'ride': ride,
			'form': form,
		}
		return render(request, template_name, context)

	def post(self, request, pk=None):
		template_name = 'index.html'
		form = RideLogForm(request.POST or None)
		if form.is_valid():
			form.instance.id = pk
			RideDetail = form.save(commit=False)
			RideDetail.user = request.user
			RideDetail.ride_date = form.cleaned_data['ride_date']
			RideDetail.ride_name = form.cleaned_data['ride_name']
			RideDetail.ride_distance = form.cleaned_data['ride_distance']
			RideDetail.ride_time = form.cleaned_data['ride_time']
			RideDetail.ride_tss = form.cleaned_data['ride_tss']
			RideDetail.ride_comment = form.cleaned_data['ride_comment']
			RideDetail.bike_name = form.cleaned_data['bike_name']
			RideDetail.wheelset = form.cleaned_data['wheelset']
			RideDetail.save()
			return redirect('log:log')
		else:
			form = RideLogForm()
			context = {
				'form':form
			}
			return render(request, 'ride.html', context)


class RideList(TemplateView):
	def get(self, request):
		template_name = 'ride_list.html'
		context = {}

		return render(request, template_name, context)

