using System;
using System.Reflection;

namespace HelloCoreClrApp
{
    public static class NetCoreHelper
    {
        public static string GetNetCoreVersion()
        {
            var assembly = typeof(System.Runtime.Versioning.FrameworkName).GetTypeInfo().Assembly;
            var assemblyPath = assembly.CodeBase.Split(new[] { '/', '\\' }, StringSplitOptions.RemoveEmptyEntries);
            var netCoreAppIndex = Array.IndexOf(assemblyPath, "Microsoft.NETCore.App");
            if (netCoreAppIndex > 0 && netCoreAppIndex < assemblyPath.Length - 2)
                return assemblyPath[netCoreAppIndex + 1];

            return null;
        }
    }
}