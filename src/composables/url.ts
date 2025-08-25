export const useLocationHrefHash = (): string => {
  return new URL(location.href).hash.split('?')[0]
}
