
const AppDisplay = imports.ui.appDisplay;
const Shell = imports.gi.Shell;
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;

if (typeof nitehogg == "undefined") var nitehogg = {};

function init() {
    nitehogg.origOnActivate = AppDisplay.AppWellIcon.prototype._onActivate;

    nitehogg.newOnActivate = function (event) {
        this.emit('launching');

        let modifiers = Shell.get_event_state(event);

        if (this._onActivateOverride) {
            this._onActivateOverride(event);
        } else {
            // Removing app activation, since the active app
            // will no longer pop into focus. ke/2011.12.18
            /*if (modifiers & Clutter.ModifierType.CONTROL_MASK
                && this.app.state == Shell.AppState.RUNNING) {*/
                this.app.open_new_window(-1);
            /*} else {
                this.app.activate();
            }*/
        }
    };
}

function enable() {
    AppDisplay.AppWellIcon.prototype._onActivate = nitehogg.newOnActivate;
}

function disable() {
    AppDisplay.AppWellIcon.prototype._onActivate = nitehogg.origOnActivate;
}
