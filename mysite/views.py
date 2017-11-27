from django.shortcuts import render_to_response
from django.shortcuts import RequestContext
from django.shortcuts import render
from django.http import HttpResponse
import json
import os
from django.views.decorators.csrf import csrf_exempt

def test(request):
    #return render_to_response('test.html', locals(), context_instance=RequestContext(request))
    return render(request, 'test.html')


def index(request):
    return render(request, 'index.html')


def data(request):
    resp = {'cpu_rate': 10, 'mem_rate': 10, 'speed': 10}
    cmd = '/var/web/cpu_per.sh'
    cpu_rate = os.popen(cmd).read()
    cmd = '/var/web/mem_per.sh'
    mem_rate = os.popen(cmd).read()
    resp['cpu_rate'] = float(cpu_rate)
    resp['mem_rate'] = float(mem_rate)
    return HttpResponse(json.dumps(resp), content_type="application/json")


@csrf_exempt
def setting(request):
    data = json.loads(request.body)
    resp = {'result': 'fail'}
    if request.method == 'POST':
        ip_num = data['ip_num']
        sip1 = data['sip1']
        sip2 = data['sip2']
        dip1 = data['dip1']
        dip2 = data['dip2']
        ip_sport = data['ip_sport']
        ip_dport = data['ip_dport']
        ip_proto = data['ip_proto']
        mask_sip1 = data['mask_sip1']
        mask_sip2 = data['mask_sip2']
        mask_dip1 = data['mask_dip1']
        mask_dip2 = data['mask_dip2']
        mask_proto = data['mask_proto']
        actid = data['actid']
        action_num = data['action_num']
        vlan_table_num = data['vlan_table_num']
        cmd = '/var/web/set_fpga_conf.sh %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s ' % (
            ip_num, sip1, sip2, dip1, dip2, ip_sport, ip_dport, ip_proto, mask_sip1, mask_sip2, mask_dip1,
            mask_dip2, mask_proto, actid, action_num, vlan_table_num)
        print(cmd)
        # os.system(cmd)
        resp['result'] = 'success'
    return HttpResponse(json.dumps(resp), content_type="application/json")
