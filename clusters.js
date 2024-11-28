import cluster from 'cluster';
import os from 'os';
// import { workerData } from 'worker_threads';

//cpus returns an array of objects containing information about each logical CPU core.
const CPUS = os.cpus();
console.log(cluster.isPrimary); /// undefined
console.log(cluster.isMaster); /// true
if(cluster.isMaster){
    //fork() Spawn(تخمریزی) a new worker process. This can only be called from the primary process.
    CPUS.forEach(() => cluster.fork());
    cluster.on('listening', worker => {
        console.log('Cluster %d connected: ', worker.process.pid);
    });
    cluster.on('disconnect', worker => {
        console.log('Cluster %d is disconnected', worker.process.pid);
    })
    cluster.on('exit', worker => {
        console.log('Cluster %d is dead: ', worker.process.pid);
        cluster.fork();
        //Ensure to starts a new cluster if an old one dies
    });
} else {
    //started via "./index.js" for new child process.
    require('./index.js');
}