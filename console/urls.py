from django.conf.urls import url

from console import views
from django.urls import path, re_path
from django.conf.urls.static import static
from studio import settings
from django.views.generic.base import TemplateView
urlpatterns = [

    # The home page
    path('', views.pratiche, name='home'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('change-password/', views.change_password, name='change-password'),
    path('change-username/', views.change_username, name='change-username'),
    path('edit/<int:n_pratica>/', views.model_edit, name='edit'),
    path('edit-guest/<int:n_user>/', views.guest_edit, name='guest-edit'),
    path('delete/<int:n_pratica>/', views.model_delete, name='delete'),
    path('add/', views.model_add, name='add'),
    path('sw.js',TemplateView.as_view(template_name='sw.js', content_type='application/javascript'),name='sw.js'),
    # Matches any html file
    #re_path(r'^.*\.*', views.pages, name='pages'),

]
if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
