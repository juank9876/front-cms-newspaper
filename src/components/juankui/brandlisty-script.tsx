"use client";
import { useEffect } from "react";

export function BrandlistyScript() {
    useEffect(() => {
        if (document.getElementById("brandlisty-script")) return;
        const script = document.createElement("script");
        script.src = "https://intercms.dev/assets/js/brandlisty-processor.js";
        script.id = "brandlisty-script";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            script.remove();
        };
    }, []);
    return null;
}
