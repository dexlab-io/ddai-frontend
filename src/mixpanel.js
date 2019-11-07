import mixpanel from "mixpanel-browser";
mixpanel.init("258c00efe344a14443b7912f828876f4", {debug: false});
export default mixpanel;

export const track = (event, obj) => {
    mixpanel.track(event, obj);
}

export const link = (obj) => {
    mixpanel.track('Click Link', obj);
}

export const cta = (obj) => {
    mixpanel.track('Click CTA', obj);
}