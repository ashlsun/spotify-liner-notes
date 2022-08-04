import NavBar from "../../components/NavBar"
export default function Error() {
    return (
        <>
        <NavBar status="error"></NavBar>
        <div className="center">
            <p> Error: Did you enter a valid URL or URI? </p>
            <a href="/" className="underline">back to home</a>

            <br></br> 
            <br></br>
            <br></br>
            <a href="/help" className="underline">how to find the URL or URI of a playlist</a>
        </div>
        </>
    )
}