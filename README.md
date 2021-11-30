# Dockerized Node.js + MongoDB

Node.js app uses:

* Express
* Mongoose
* Handlebars

## How to use

* With Docker Compose:
    * **First** copy `.env.sample` as `.env` and adjust values,
    * `docker-compose up`
* With Minikube:

    * **First** copy `mongo-secret.tmpl.yaml` as `mongo-secret.yaml`,
    * Put base-64 encoded username and password in `mongo-secret.yaml`,
    * Launch Minikube: `minikube start`,
    * Then cd to `k8s` and `./start-all.sh`,
    * Finally, start external service: `minikube service node-mongo-demo-service`

## Issues

* Auth doesn't seem to work if the db is sth else than `admin`: <https://stackoverflow.com/q/34559557>
* :warning: **Make sure `kubectl` and `minikube` versions are consistent**. On Debian Buster, `minikube` is an old version. It's better to download the Linux binary (e.g. `amd64`) corresponding to the installed `kubectl` version, directly from the [minikube repo's releases page](https://github.com/kubernetes/minikube/releases), untar it, and copy it to `/usr/bin`.

## Use K8s

* First publish the Node app to a local Docker registry
* ~~Spin up a local registry: `docker run -d -p 8000:8000 -v ~/DevOps/docker-registry-data: --restart=always --name registry registry:2`~~
* **Simpler**: publish to GHCR.

    * Doc: [Working with the Container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
    * Create a GitHub Personal Access Token with `read:packages`, `write:packages` and `delete:packages`
    * `export CR_PAT=YOUR_PAT_VALUE`
    * Login to GHCR: `echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin`
    * Build and tag the image: `sudo docker build -t ghcr.io/bhubr/node-mongoose-demo:0.0.1 .`
    * Push the image: `docker push ghcr.io/bhubr/node-mongoose-demo:0.0.1`
    * Remove a published version, e.g. 0.0.2: `docker rmi  ghcr.io/bhubr/node-mongoose-demo:0.0.2`
