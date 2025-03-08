export const decodeToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
        const payloadBase64 = token.split('.')[1]; // Get the payload part
        const decodedPayload = atob(payloadBase64); // Decode Base64
        return JSON.parse(decodedPayload); // Convert to object
    } else {
        console.log("Token not found in localStorage");
        return null
    }

}