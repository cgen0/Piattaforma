from django import forms
from console.models import Pratica


class PraticaForm(forms.ModelForm):
    class Meta:
        model = Pratica
        fields = ['pratica', 'nome', 'indirizzo']

