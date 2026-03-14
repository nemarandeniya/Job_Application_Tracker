

const NotificationModal = ({ notifications }) => {

    return (
        <div className='absolute right-0 mt-8 w-72 bg-white shadow-2xl rounded-lg border border-amber-50 z-50'>
            <div className="p-3 font-semibold border-b-2 border-gray-400">
                Upcoming Interviews
            </div>
            {notifications.length === 0 ? (

                <div className="max-h-60 overflow-y-auto">
                    <div className='p-3 border-b-gray-500'>
                        <p>No Interviews</p>
                    </div>

                </div>
            ) : (
                <div className="max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                        <div key={n._id} className='p-3 border-b-gray-400 text-gray-600'>
                            Interview Tommorow - {n.companyName} at {n.interviewTime}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NotificationModal