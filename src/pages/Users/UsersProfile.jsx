// src/pages/Users/UserProfile.jsx
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AcademicCapIcon, PhoneIcon, CalendarIcon, SparklesIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useUserProfile, useViewUserProfile, useUpdateUserProfile } from '../../hooks/useUsers'
import { getFileUrl } from '../../utils/getFileUrl'
import Spinner from '../../components/common/Spinner'

function EditUserModal({ open, onClose, onSubmit, initialData, loading }) {
  const [form, setForm] = useState({
    course: initialData?.course || '',
    year_of_study: initialData?.year_of_study || '',
    phone: initialData?.phone || '',
    hobbies: initialData?.hobbies || '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(
    initialData?.profile_image ? getFileUrl(initialData.profile_image) : null
  )

  if (!open) return null

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('course', form.course ?? '')
    formData.append('year_of_study', form.year_of_study ?? '')
    formData.append('phone', form.phone ?? '')
    formData.append('hobbies', form.hobbies ?? '')
    if (imageFile) {
      formData.append('profile_image', imageFile)
    }

    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-iconBg/40">
          <h2 className="font-semibold text-dark">Update User</h2>
          <button onClick={onClose} className="text-muted hover:text-dark">
            <XMarkIcon className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Profile image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full border border-iconBg/40" />
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Course</label>
            <input
              name="course"
              value={form.course}
              onChange={handleChange}
              className="w-full border border-iconBg/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Year of study</label>
            <input
              type="number"
              name="year_of_study"
              value={form.year_of_study}
              onChange={handleChange}
              min="1"
              className="w-full border border-iconBg/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-iconBg/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Hobbies</label>
            <textarea
              name="hobbies"
              value={form.hobbies}
              onChange={handleChange}
              rows={3}
              className="w-full border border-iconBg/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-iconBg/50 text-muted hover:text-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-white disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function UserProfile() {
  const { userId } = useParams()
  const { data: user, isLoading: userLoading, isError: userError, error: userErr } = useUserProfile(userId)
  const { data: profile, isLoading: profileLoading, isError: profileError, error: profileErr } = useViewUserProfile(userId)
  const updateUserProfile = useUpdateUserProfile()

  const [editOpen, setEditOpen] = useState(false)

  const isLoading = userLoading || profileLoading
  const isError = userError || profileError
  const error = userErr || profileErr

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={28} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
        {error?.response?.data?.message || 'Could not load this profile'}
      </div>
    )
  }

  const course = profile?.course
  const yearOfStudy = profile?.year_of_study
  const phone = profile?.phone
  const hobbies = profile?.hobbies
  const profileImage = profile?.profile_image

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const handleUpdate = async (formData) => {
    try {
      await updateUserProfile.mutateAsync(formData)
      toast.success('Profile updated')
      setEditOpen(false)
    } catch {
      // interceptor already toasts the failure
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-0">
      {/* Header card */}
      <div className="rounded-xl border border-iconBg/50 bg-white p-4 sm:p-6 mb-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:items-start sm:text-left sm:gap-4">
            {profileImage ? (
              <img
                src={getFileUrl(profileImage)}
                alt={user?.name || 'Profile'}
                className="size-14 sm:size-16 rounded-full object-cover shrink-0"
              />
            ) : (
              <span className="flex items-center justify-center size-14 sm:size-16 rounded-full bg-primary text-white text-lg sm:text-xl font-semibold shrink-0">
                {initials}
              </span>
            )}

            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-dark truncate">{user?.name}</h1>
              <p className="text-muted text-sm truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-primary border border-primary/30 rounded-lg px-3 py-2 hover:bg-primary/5 shrink-0"
          >
            <PencilIcon className="size-4" />
            <span className="hidden sm:inline">Update User</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-iconBg/40">
          <div className="flex items-center gap-2.5 text-sm">
            <AcademicCapIcon className="size-[18px] text-primary shrink-0" />
            <span className={course ? 'text-dark break-words' : 'text-muted italic'}>
              {course || 'Course not set'}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <CalendarIcon className="size-[18px] text-primary shrink-0" />
            <span className={yearOfStudy ? 'text-dark' : 'text-muted italic'}>
              {yearOfStudy ? `Year ${yearOfStudy}` : 'Year not set'}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <PhoneIcon className="size-[18px] text-primary shrink-0" />
            <span className={phone ? 'text-dark break-words' : 'text-muted italic'}>
              {phone || 'No phone number'}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <SparklesIcon className="size-[18px] text-primary shrink-0" />
            <span className={hobbies ? 'text-dark break-words' : 'text-muted italic'}>
              {hobbies || 'No hobbies listed'}
            </span>
          </div>
        </div>
      </div>

      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialData={profile}
        loading={updateUserProfile.isPending}
      />
    </div>
  )
}