'use client'
import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'

const GreenSwitch = styled((props) => (
<Switch
  focusVisibleClassName=".Mui-focusVisible"
  disableRipple   {...props}
/>
))(({ theme }) => ({
  width: 53,
  height: 24,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 3,
    transitionDuration: '500ms',

    '&.Mui-checked': {
      transform: 'translateX(31px)',
      color: '#fff',

      '& + .MuiSwitch-track': {
        backgroundColor: '#10B981',
        opacity: 1,
        border: 0,
      },

      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },

    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },

    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
  },

  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },

  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function ReceptionistPrivileges({formData , setFormData ,getPaymentSettings, selectedRoleKey}) {
  const {t, i18n} = useTranslation() 
  const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

  const permissionTranslationKeys = {
    confirm_reservations: 'Confirm/Reject Reservations',
    mark_attendance: 'Mark attendance/non-attendance',
    seat_guests: 'Seating the guests',
    edit_floorplan: 'Floor plan modification',
    manage_waitlist: 'Waiting List Management',
  };

  const activeRole = formData?.roles?.find((r) => r.role_key === selectedRoleKey);
  const permissions = activeRole?.permissions || [];

  const handleTogglePermission = (roleKey, permissionKey) => {
    setFormData((prev) => {
      const updatedRoles = prev.roles.map((role) => {
        if (role.role_key === roleKey) {
          const updatedPermissions = role.permissions.map((perm) => {
            if (perm.key === permissionKey) {
              return {
                ...perm,
                is_selected: !perm.is_selected,
              };
            }
            return perm;
          });
          return {
            ...role,
            permissions: updatedPermissions,
          };
        }
        return role;
      });
      return {
        ...prev,
        roles: updatedRoles,
      };
    });
  };

  const roleName = activeRole?.role_name?.[currentLang] || activeRole?.role_name?.en || '';
  const title = roleName
    ? (currentLang === 'ar' ? `صلاحيات ${roleName}` : `${roleName} privileges`)
    : t('Receptionist privileges');

  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <p className='text-[#364152] text-base font-medium'>{title}</p>

      {permissions.map((permission, index) => (
        <div key={permission.key}>
          <div className='flex justify-between items-center mt-4'>
            <p className='text-[#364152] text-sm font-normal'>
              {t(permissionTranslationKeys[permission.key] || permission.key)}
            </p>
            <p>
              <GreenSwitch
                checked={!!permission.is_selected}
                onChange={() => handleTogglePermission(selectedRoleKey, permission.key)}
              />
            </p>
          </div>
          {index < permissions.length - 1 && <div className='border border-[#E3E8EF] my-3'></div>}
        </div>
      ))}

    

  
    </div>

    </>
  )
}

export default ReceptionistPrivileges