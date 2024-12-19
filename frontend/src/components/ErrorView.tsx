export default function ErrorView({error}: { error: string | null }) {

    if (!error) return null;

    return (
        <p>{error}</p>
    );
}