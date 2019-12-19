# Couchbase Lite Storage Demo - Tea Cagtegories

This application performs full CRUD operations storing the data in a local Couchbase Lite database.  The solution used for this application is a special purpose plugin, and its functionality is tailored around a specific customer's needs. This plugin is best used only for applications that have a specific need to support Couchbase. For a better general offline storage option that is not dependent on Couchbase, please see our Offline Storage solution.

## Running the Application

In order to run this application, you need access to the Ionic Enterprise Couchbase Lite plugin.  If you have a specific need for Couchbase Lite support and do not have access to this plugin, please contact your account manager.

Here are the general steps required to run this application:

- clone the repo and change to its root directory
- `npm install`
- `npm run build`
- `ionic cordova platform add ios` (and/or android)
- `ionic cordova platform build ios` (and/or android)

At this point you should be able to sideload the application on a device or run it in an emulator and try it out.

## General Architecture

### Tea Categories Service

This services handles all of the CRUD operations. The service communicates with callers by passing the tea categories as regular typed TypeScript models rather than database objects. The reason for this is so the storage mechanism can easily be changed without affecting the callers.

### Pages

The pages know nothing about how the data is stored. The logic in the pages is only concerned with how the data is displayed and manipulated on the pages themselves. The end result being that if the way data is stored chanages the logic in the pages does not need to be touched.
