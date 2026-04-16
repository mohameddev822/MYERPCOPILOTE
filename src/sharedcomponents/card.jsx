export default function Card ({title , value , sign}) {
    return (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-44 w-64 mt shadow-md p-6 w-64 mt-6  ml-6 flex flex-col" >
            <h3 className="text-lg font-bold text-yellow-200">{title}</h3>
            <p className="text-2xl font-bold text-white  justify-center items-center mt-4">{value}{sign}</p>
        </div>
    )
}