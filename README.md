# muz
Web app meant to manage educational process at the music school.
Based on:
- Django & DjangoREST framework for backend and API;
- React & Redux & Redux-Saga & ant-design JS libraries for frontend functionality and state management.

***

Backend:
- contains two apps: `school` & `library` 
(first describes learning process, second contains references to knowledge base);
- each app has specific serializers and views set (JSON-only);
- all app views are aggregated in root `api.py`;
- additional root `meta.py` exports Django models' structure to frontend
(for automated forms)
- two frontend outlets: `tycoon` (teacher's admin site) and `diary` (pupils' site)
(refer to pre-built React apps `march.html` and `april.html` respectively);
- REST API views' permissions are set to 'DjangoModelPermissions';
- to avoid CircularDependencyError you have to comment `task` field
in `library.SourceIndex` model, after the first migration uncomment the field,
then repeat migration.

***

Frontend:
- two separate React apps `tycoon` and `diary`, contained in folders `march` and `april`;
- `tycoon` - multi-purpose database admin site with data-driven tables, forms, CRUD operations,
basic authentication system; completely relies on DjangoREST API;
- `diary` - primitive data parser for music school diary;
- user requests contain tokens that define which set of data to send to the user;
- all API data is shared between components via Redux store;
- all Redux actions are dispatched and processed through redux-saga middleware;
- CRUD operations are limited to 'DjangoModelPermissions'.
