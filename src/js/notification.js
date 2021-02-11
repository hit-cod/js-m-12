import "../styles.css";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
// import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const notifyAboutMatches = () => {
    error({
      text: 'Too many matches found. Please enter amore specific query!'
    });
    };

export default notifyAboutMatches;