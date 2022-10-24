from django import template

register = template.Library()


@register.simple_tag
def get_checked(item):
    ids=""
    for a in item["accesso"]:
        try:
            if a == "Nessuna":
                return ""
        except Exception:
            pass
        try:
            ids=ids+str(a.pratica)+","
        except AttributeError:
            return ""
    return ids