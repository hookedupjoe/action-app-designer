# Action App Designer
Designed to build applications using the Action App environment

* Author - Joseph Francis
* License - MIT

# To Run
* npm install
* npm start

# Note

Important: If you get an error during the installation ..

* Install this .. run as administrator when doing so..
* npm install --global --production windows-build-tools
*  and
* npm config set python C:\Users\YOURUSERNAME\.windows-build-tools\python27\python.exe


For Cordova Apps, 11 and higher, add this to the config for API's to work
Add this to the config system
<preference name="hostname" value="localhost" />
<preference name="AndroidInsecureFileModeEnabled" value="true" />


Do not install whitelist plugin any longer

Config Details
    <platform name="android">
        <allow-intent href="market:*" />
        <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application">
            <application android:usesCleartextTraffic="true" />
        </edit-config>
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
    <plugin name="cordova-plugin-file" spec="^6.0.2" />
    <plugin name="cordova-plugin-networkinterface" spec="^2.2.0" />
