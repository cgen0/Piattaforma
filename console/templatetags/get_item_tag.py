from django import template

register = template.Library()


@register.simple_tag
def get_item(item, field):
    return getattr(item,field.name)