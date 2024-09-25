from multiprocessing import cpu_count
def max_workers():    
    return cpu_count()

#pidfile = 'app01.pid'
worker_tmp_dir = '/dev/shm'
workers = max_workers()
threads = 4
worker_class = "gthread"
worker_connections = 1000

#proc_name = 'app01'
bind = '0.0.0.0:8087'