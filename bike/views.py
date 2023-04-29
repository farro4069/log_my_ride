from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import TemplateView
from django.db.models import Sum
from django.views.generic import TemplateView
from bike.models import BikeDetail, Wheelsets
from bike.forms import BikeForm, WheelForm, MaintenanceForm



class BikesView(TemplateView):
	template_name = 'bikes.html'

	def get(self, request):
		bikes = BikeDetail.objects.all().annotate(bike_distance=Sum('ridedetail__ride_distance')).order_by('-date_acquired')[:20]
		form = MaintenanceForm(request.POST or None)

		context = {
			'bikes': bikes, 
			'form': form,
			}
		return render(request, self.template_name, context)

	def post(self, request):
		form = MaintenanceForm(request.POST or None)
		user = request.user
		if form.is_valid():
			maintenance = form.save(commit=False)
			maintenance.user = user
			maintenance.bike = form.cleaned_data['bike']
			maintenance.date = form.cleaned_data['date']
			maintenance.content = form.cleaned_data['content']
			maintenance.save()

		context = {
			'form': form, 
			}
		return render(request, self.template_name, context)


class EditBike(TemplateView):
	def get(self, request, pk=None):
		user = request.user
		template_name = 'edit_bike.html'
		bike = get_object_or_404(BikeDetail, id=pk)
		form = BikeForm(request.POST or None, instance=bike )
		context = {
			'user': user,
			'bike': bike,
			'form': form,
		}
		return render(request, template_name, context)

	def post(self, request, pk=None):
		template_name = 'edit_bike.html'
		user = request.user
		form = BikeForm(request.POST or None, request.FILES or None)
		form.instance.id = pk

		if form.is_valid():
			BikeDetail = form.save(commit=False)
			BikeDetail.user = user
			BikeDetail.date_acquired = request.POST['date_acquired']
			BikeDetail.bike_name = form.cleaned_data['bike_name']
			BikeDetail.description = form.cleaned_data['bike_description']
			BikeDetail.comments = form.cleaned_data['comments']
			BikeDetail.specs = form.cleaned_data['specs']
			BikeDetail.image = form.cleaned_data['image']
			BikeDetail.save()
			return redirect('bike:bike')
		else:
			print('OOps')
			form = BikeForm(request.POST or None, request.FILES or None)
			context = {
				'user': user,
				'bike': bike, 
				'form': form,
			}
			return render(request, template_name, context)



class AddBike(TemplateView):
	template_name = 'add_bike.html'

	def get(self, request):
		form = BikeForm()
		wheelform = WheelForm()
		user = request.user
		context = {
			'user': user,
			'form': form,
			'wheelform': wheelform 
		}
		return render(request, self.template_name, context)

	def post(self, request):
		form = BikeForm(request.POST or None, request.FILES or None)
		user = request.user
		if form.is_valid():
			BikeDetail = form.save(commit=False)
			BikeDetail.user = user
			BikeDetail.date_acquired = request.POST['date_acquired']
			BikeDetail.bike_name = form.cleaned_data['bike_name']
			BikeDetail.description = form.cleaned_data['bike_description']
			BikeDetail.comments = form.cleaned_data['comments']
			BikeDetail.specs = form.cleaned_data['specs']
			BikeDetail.image = form.cleaned_data['image']
			BikeDetail.save()
			return redirect('bike:bike')
		else:
			print('OOps')
			form = BikeForm(request.POST)
			context = {
				'user': user,
				'form': form,
			}
			return render(request, template_name, context)


class AddWheelset(TemplateView):
	def get(self, request):
		template_name = 'add_wheelset.html'
		form = WheelForm(request.POST or None, request.FILES or None)
		user = request.user
		context = {
			'user': user,
			'form': form,
		}
		return render(request, template_name, context)

	def post(self, request):
		template_name = 'add_wheelset.html'
		form = WheelForm(request.POST or None, request.FILES or None)
		user = request.user
		if form.is_valid():
			wheelset = form.save(commit=False)
			wheelset.user = user
			wheelset.date_acquired = request.POST['date_acquired']
			wheelset.wheels_name = form.cleaned_data['wheels_name']
			wheelset.comments = form.cleaned_data['comments']
			wheelset.image = form.cleaned_data['image']
			wheelset.save()
			return redirect('bike:bike')
		else:
			print('OOps')
			form = WheelsForm(request.POST)
			context = {
				'user': user,
				'form': form,
			}
			return render(request, template_name, context)

class EditWheelset(TemplateView):
	def get(self, request, pk=None):
		user = request.user
		template_name = 'edit_wheelset.html'
		wheelset = get_object_or_404(Wheelsets, id=pk)
		form = WheelForm(request.POST or None, instance=wheelset )
		context = {
			'user': user,
			'wheelset': wheelset,
			'form': form,
		}
		return render(request, template_name, context)

	def post(self, request, pk=None):
		template_name = 'edit_wheelset.html'
		user = request.user
		form = WheelForm(request.POST or None, request.FILES or None)
		form.instance.id = pk

		if form.is_valid():
			wheelset = form.save(commit=False)
			wheelset.user = user
			wheelset.date_acquired = form.cleaned_data['date_acquired']
			wheelset.wheels_name = form.cleaned_data['wheels_name']
			wheelset.comments = form.cleaned_data['comments']
			wheelset.date_sold = form.cleaned_data['date_sold']
			wheelset.image = form.cleaned_data['image']
			wheelset.save()
			return redirect('bike:wheels')
		else:
			print('OOps')
			form = WheelForm(request.POST or None, request.FILES or None)
			context = {
				'user': user,
				'wheelset': wheelset, 
				'form': form,
			}
			return render(request, template_name, context)


