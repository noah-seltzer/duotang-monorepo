import { type FC, type PropsWithChildren } from 'react'
import { classNames } from '../../util/tw'

export interface GenericComponentProps {
    className?: string
}

export const HeaderRow: FC<PropsWithChildren<GenericComponentProps>> = ({
    children
}) => (
    <th scope='col' className='px-6 py-3'>
        {children}
    </th>
)

export const Header: FC<PropsWithChildren> = ({ children }) => (
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>{children}</tr>
    </thead>
)

export const TableRow: FC<PropsWithChildren> = ({ children }) => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
        {children}
    </tr>
)

export const TableData: FC<PropsWithChildren<GenericComponentProps>> = ({
    children,
    className
}) => (
    <td className={classNames('px-6 py-4 space-y-2', className)}>{children}</td>
)
