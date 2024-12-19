import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
    data: string; // The data to encode in the QR code
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ data }) => {
    const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const url = await QRCode.toDataURL(data, {
                    width: 256, // Width of the QR code
                    margin: 2,  // Margin around the QR code
                    errorCorrectionLevel: "H", // High error correction level
                });
                setQrCodeDataURL(url);
            } catch (error) {
                console.error("Failed to generate QR code:", error);
            }
        };

        generateQRCode();
    }, [data]);

    return (
        <div>
            <h1>QR Code</h1>
            {qrCodeDataURL ? (
                <img src={qrCodeDataURL} alt="Generated QR Code" />
            ) : (
                <p>Generating QR Code...</p>
            )}
        </div>
    );
};

export default QRCodeGenerator;
