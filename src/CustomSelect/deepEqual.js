export default function deepEqual(a, b) {
	if (a === b) return true
  
	const aType = typeof a
	if (aType !== typeof b) return false
  
	const aIsArray = Array.isArray(a)
	const bIsArray = Array.isArray(b)
	if (aIsArray !== bIsArray) return false
  
	if (aIsArray) {
	  if (a.length !== b.length) return false
  
	  return !a.some((aValue, i) => !deepEqual(aValue, b[i]))
	}
  
	if (aType === 'object' && a !== null && b !== null) {
	  const aKeys = Object.keys(a)
	  if (aKeys.length !== Object.keys(b).length) return false
	  if (aKeys.some((aKey) => !(aKey in b))) return false
  
	  return !aKeys.some((key) => !deepEqual(a[key], b[key]))
	}
  
	if (Number.isNaN(a)) return Number.isNaN(b)
  
	return false
  }
  