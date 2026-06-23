export default function Card ({title , value , sign}) {
    return (
        <div className="bg-red-200 h-44 w-64 mt shadow-md p-6 w-64 mt-6  ml-6 flex flex-col" >
            <h3 className="text-lg font-bold ">{title}</h3>
            <p className="text-2xl font-bold  justify-center items-center mt-4">{value}{sign}</p>
        </div>
    )
}