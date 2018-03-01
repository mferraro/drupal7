========================
{{cookiecutter.appname}}
========================

Dependencies
------------

* Git.
* Python 3, pip and virtualenvwrapper.
* Node LTS and npm with `nvm <https://github.com/creationix/nvm>`__
* Firefox para los test E2E. Hace falta instalar `geckodriver <https://github.com/mozilla/geckodriver/releases>`__ en el PATH (en macOS basta con `brew install geckodriver`).
* `Editorconfig <http://editorconfig.org/#download>`__ for development.


Installation and run
--------------------

#. Clone project from repo ::

    git clone <repo_url>

#. Setup virtualenv Python ::

    cd appname
    mkvirtualenv "appname" -p python3 -a ./src
    cd ..
    pip install -r requirements/local.txt

#. Setup Javascript environment ::

    npm install

#. Create local configuration ::

    cd src
    cp app.ini.template app.ini
    # Review and edit app.ini

#. Crear base de datos ::

    python manage.py migrate
    python manage.py createsuperuser

#. Run local server an check tests ::

    python manage.py runserver
    # With runserver running, open another terminal in the same virtualenv and
    # src directory and run
    pytest
    # If some test fails, a browser screenshot will be saved in src/tests_failures.
