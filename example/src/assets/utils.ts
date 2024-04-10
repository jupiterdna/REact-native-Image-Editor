const test =  autoResize(width: number, height: number, newWidth: number, newHeight: number): { width: number, height: number } {
    const aspectRatio = width / height;
    let resizedWidth = newWidth;
    let resizedHeight = newHeight;

    if (newWidth !== width) {
        resizedHeight = newWidth / aspectRatio;
    } else if (newHeight !== height) {
        resizedWidth = newHeight * aspectRatio;
    }

    return { width: resizedWidth, height: resizedHeight };
}