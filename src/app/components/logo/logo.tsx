import Image from "next/image";
import { brandName } from "@/app/shared/shared";

export type LogoOptions = {
    src?: string;
    label?: string;
    fontSize?: number;
    className?: string;
    fontWeight?: number;
}

export default function Logo({
    fontSize = 18,
    fontWeight = 600,
    label = brandName,
    className = `logo`,
    src = `/images/logos/QuizListLogo.svg`,
}: LogoOptions) {
    return (
        <div className={`logoContainer ${className} flex alignCenter start gap10`} style={{ fontWeight }}>
            <Image src={src} alt={`Logo`} width={27} height={27} />
            <label style={{ fontSize }}>
                {label}
            </label>
        </div>
    )
}