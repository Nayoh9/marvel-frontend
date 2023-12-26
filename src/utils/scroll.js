export const disableScroll = () => {
    document.body.style.overflowY = "hidden";
};

// Fonction pour réactiver le scroll
export const enableScroll = () => {
    document.body.style.overflowY = "visible";
};