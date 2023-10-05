import CircularProgress from "@mui/material/CircularProgress";

export default function AppLoading(){
    return <div className='h-screen w-screen flex items-center justify-center'>
        <CircularProgress />
    </div>
}