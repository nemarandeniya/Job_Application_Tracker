import React from 'react'

const DashboardCard = ({ title, icon, value }) => {
    return (
        <div className={'max-w-sm p-7 ms-7 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-50/80 border border-gray-200 backdrop-blur-sm'}>
            <div className="flex items-center justify-between">
                <div className="text-md font-mono text-neutral-700">{title}</div>
                <div className="">{icon}</div>
            </div>
            <div className="text-lg font-mono text-neutral-900">{value}</div>
        </div>
    )
}

export default DashboardCard