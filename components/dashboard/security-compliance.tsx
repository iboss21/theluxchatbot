"use client"

import { useState } from "react"
import { Shield, AlertTriangle, Lock, Eye, CheckCircle, XCircle, Info } from "lucide-react"

export function SecurityCompliance() {
  const [enabledSecurity, setEnabledSecurity] = useState({
    twoFactor: true,
    ipRestrictions: false,
    dataEncryption: true,
    accessLogs: true,
  })

  const toggleSecurity = (key: keyof typeof enabledSecurity) => {
    setEnabledSecurity((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const complianceStatus = [
    { name: "GDPR", compliant: true },
    { name: "HIPAA", compliant: false },
    { name: "SOC 2", compliant: true },
    { name: "ISO 27001", compliant: false },
  ]

  return (
    <div className="space-y-4">
      <div className="glass-card p-3">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <Shield className="h-4 w-4 mr-1 text-lux-cyan" />
          Security Settings
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2 text-white/70" />
              <span className="text-sm">Two-Factor Authentication</span>
            </div>
            <button
              onClick={() => toggleSecurity("twoFactor")}
              className={`w-10 h-5 rounded-full relative transition-colors ${
                enabledSecurity.twoFactor ? "bg-lux-cyan" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  enabledSecurity.twoFactor ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-white/70" />
              <span className="text-sm">IP Restrictions</span>
            </div>
            <button
              onClick={() => toggleSecurity("ipRestrictions")}
              className={`w-10 h-5 rounded-full relative transition-colors ${
                enabledSecurity.ipRestrictions ? "bg-lux-cyan" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  enabledSecurity.ipRestrictions ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2 text-white/70" />
              <span className="text-sm">Data Encryption</span>
            </div>
            <button
              onClick={() => toggleSecurity("dataEncryption")}
              className={`w-10 h-5 rounded-full relative transition-colors ${
                enabledSecurity.dataEncryption ? "bg-lux-cyan" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  enabledSecurity.dataEncryption ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-white/70" />
              <span className="text-sm">Access Logs</span>
            </div>
            <button
              onClick={() => toggleSecurity("accessLogs")}
              className={`w-10 h-5 rounded-full relative transition-colors ${
                enabledSecurity.accessLogs ? "bg-lux-cyan" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  enabledSecurity.accessLogs ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-3">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1 text-lux-cyan" />
          Compliance Status
        </h3>

        <div className="space-y-2">
          {complianceStatus.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <span className="text-sm">{item.name}</span>
              {item.compliant ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-lux-cyan/10 border border-lux-cyan/30 rounded-md p-3 text-xs flex">
        <Info className="h-4 w-4 mr-2 flex-shrink-0 text-lux-cyan" />
        <p className="text-white/80">
          Your security score: <span className="text-lux-cyan font-medium">75/100</span>. Enable IP Restrictions to
          improve your security posture.
        </p>
      </div>

      <button className="w-full py-2 text-lux-cyan text-sm border border-lux-cyan/30 rounded-md hover:bg-lux-cyan/10 transition-colors">
        View Security Report
      </button>
    </div>
  )
}

